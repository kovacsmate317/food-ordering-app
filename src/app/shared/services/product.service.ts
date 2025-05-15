import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  getDoc,
  where,
  orderBy,
  endAt,
  startAt,
  limit,
} from '@angular/fire/firestore';
import {
  Observable,
  from,
  map,
  of,
  take,
  firstValueFrom,
  catchError,
} from 'rxjs';
import { AuthService } from './auth.service';
import { Product } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly PRODUCTS_COLLECTION = 'Products';

  constructor(private authService: AuthService, private firestore: Firestore) {}

  async addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    try {
      const user = await firstValueFrom(
        this.authService.currentUser.pipe(take(1))
      );
      if (!user) {
        throw new Error('No authenticated user found');
      }

      const productsCollection = collection(
        this.firestore,
        this.PRODUCTS_COLLECTION
      );

      const productToSave = {
        ...product,
      };

      const docRef = await addDoc(productsCollection, productToSave);
      const productId = docRef.id;

      await updateDoc(docRef, { id: productId });

      const newProduct = {
        ...productToSave,
        id: productId,
      } as Product;

      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }

  getTopExpensiveProducts(): Observable<Product[]> {
    const productsCollection = collection(
      this.firestore,
      this.PRODUCTS_COLLECTION
    );
    const q = query(productsCollection, orderBy('price', 'desc'), limit(5));
    return from(getDocs(q)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => ({ ...(doc.data() as Product), id: doc.id }))
      ),
      catchError(() => of([]))
    );
  }

  getAllproducts(): Observable<Product[]> {
    const productsCollection = collection(
      this.firestore,
      this.PRODUCTS_COLLECTION
    );
    const q = query(productsCollection);

    return from(getDocs(q)).pipe(
      map((querySnapshot) =>
        querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Product),
          id: doc.id,
        }))
      ),
      catchError((error) => {
        console.error('Error fetching products:', error);
        return of([]);
      })
    );
  }

  async getProductById(productId: string): Promise<Product | null> {
    try {
      const productDocRef = doc(
        this.firestore,
        this.PRODUCTS_COLLECTION,
        productId
      );
      const productDSnapshot = await getDoc(productDocRef);

      if (productDSnapshot.exists()) {
        return { ...productDSnapshot.data(), id: productId } as Product;
      }

      return null;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }

  async updateproduct(
    productId: string,
    updatedData: Partial<Product>
  ): Promise<void> {
    try {
      const productDocRef = doc(
        this.firestore,
        this.PRODUCTS_COLLECTION,
        productId
      );
      await updateDoc(productDocRef, updatedData);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      const productDocRef = doc(
        this.firestore,
        this.PRODUCTS_COLLECTION,
        productId
      );
      await deleteDoc(productDocRef);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  getSpicyProducts(minSpicy: number = 3): Observable<Product[]> {
    const productsCollection = collection(
      this.firestore,
      this.PRODUCTS_COLLECTION
    );
    const q = query(productsCollection, where('spicyLevel', '>=', minSpicy));

    return from(getDocs(q)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => ({ ...(doc.data() as Product), id: doc.id }))
      ),
      catchError((error) => {
        console.error('Error fetching spicy products:', error);
        return of([]);
      })
    );
  }
  searchProductsByName(prefix: string): Observable<Product[]> {
    const productsCollection = collection(
      this.firestore,
      this.PRODUCTS_COLLECTION
    );
    const q = query(
      productsCollection,
      orderBy('name'),
      startAt(prefix),
      endAt(prefix + '\uf8ff')
    );

    return from(getDocs(q)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => ({ ...(doc.data() as Product), id: doc.id }))
      ),
      catchError((error) => {
        console.error('Error searching products:', error);
        return of([]);
      })
    );
  }
}

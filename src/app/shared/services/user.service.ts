import { Injectable } from '@angular/core';
import { User, Order } from '../models/types';
import {
  Firestore,
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  getUserProfile(): Observable<{
    user: User | null;
    orders: Order[];
    stats: {
      total: number;
      completed: number;
      pending: number;
      completionRate: number;
    };
  }> {
    return this.authService.currentUser.pipe(
      switchMap((authUser) => {
        if (!authUser) {
          return of({
            user: null,
            orders: [],
            stats: { total: 0, completed: 0, pending: 0, completionRate: 0 },
          });
        }

        return from(this.fetchUserWithOrders(authUser.uid));
      })
    );
  }

  private async fetchUserWithOrders(userId: string): Promise<{
    user: User | null;
    orders: Order[];
    stats: {
      total: number;
      completed: number;
      pending: number;
      completionRate: number;
    };
  }> {
    try {
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        return {
          user: null,
          orders: [],
          stats: { total: 0, completed: 0, pending: 0, completionRate: 0 },
        };
      }

      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: userId };

      if (!user.orders || user.orders.length === 0) {
        return {
          user,
          orders: [],
          stats: { total: 0, completed: 0, pending: 0, completionRate: 0 },
        };
      }

      const ordersCollection = collection(this.firestore, 'Orders');
      const q = query(ordersCollection, where('id', 'in', user.orders));
      const ordersSnapshot = await getDocs(q);

      const orders: Order[] = [];
      ordersSnapshot.forEach((doc) => {
        orders.push({ ...doc.data(), id: doc.id } as Order);
      });

      const total = orders.length;
      const completed = orders.filter(
        (order) => order.status === 'completed'
      ).length;
      const pending = total - completed;
      const completionRate = total > 0 ? (completed / total) * 100 : 0;

      return {
        user,
        orders,
        stats: {
          total,
          completed,
          pending,
          completionRate,
        },
      };
    } catch (error) {
      console.error('Hiba a felhasználói adatok betöltése során:', error);
      return {
        user: null,
        orders: [],
        stats: { total: 0, completed: 0, pending: 0, completionRate: 0 },
      };
    }
  }

  async getUserById(userId: string): Promise<User | null> {
    try {
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) return null;

      const userData = userSnapshot.data() as User;
      return { ...userData, id: userId };
    } catch (error) {
      console.error('Hiba a getUserById metódusban:', error);
      return null;
    }
  }
}

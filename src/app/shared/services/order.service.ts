import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from '@angular/fire/firestore';
import { Order } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ORDERS_COLLECTION = 'Orders';
  private USERS_COLLECTION = 'Users';

  constructor(private firestore: Firestore) {}

  async createOrder(order: Omit<Order, 'id'>, userId: string): Promise<Order> {
    const colRef = collection(this.firestore, this.ORDERS_COLLECTION);
    const docRef = await addDoc(colRef, order);
    const newOrder: Order = { ...order, id: docRef.id };

    const userDocRef = doc(this.firestore, this.USERS_COLLECTION, userId);
    await updateDoc(userDocRef, {
      orders: arrayUnion(docRef.id),
    });

    return newOrder;
  }
}

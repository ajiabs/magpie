import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from './../../../../src/environments/environment';
import 'rxjs/add/observable/of';
import * as io from 'socket.io-client';




var socket_url = environment.socket_url;

@Injectable()
export class WebsocketService {
  result: any;
  private socket = io(socket_url);
  constructor(private http: HttpClient) { }

  joinRoom(data) {
    this.socket.emit('join', data);
  }

  createItem(data) {
    this.socket.emit('createItem', data);
  }

  createItemMessageReceived() {
    const observable = new Observable<{message:string}>(observer => {
      this.socket.on('new item', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  updateItem(data) {
    this.socket.emit('updateItem', data);
  }

  updateItemMessageReceived() {
    const observable = new Observable<{message:string}>(observer => {
      this.socket.on('update item', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  deleteItem(data) {
    this.socket.emit('deleteItem', data);
  }

  deleteItemMessageReceived() {
    const observable = new Observable<{message:string}>(observer => {
      this.socket.on('delete item', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }


  changeItemStatus(data) {
    this.socket.emit('changeItemStatus', data);
  }

  changeItemStatusMessageReceived() {
    const observable = new Observable<{message:string}>(observer => {
      this.socket.on('change status item', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }







}
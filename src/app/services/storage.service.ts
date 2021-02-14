import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {
    write(key: string, value: any) {
        if (value) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }
    clear() {
        // localStorage.clear(); 
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }



    
    read<T>(key: string): T {
        let value = localStorage.getItem(key);
        if (value && value != "undefined" && value != "null") {
            const  dd = <T>JSON.parse(value);
            return <T>JSON.parse(value);
        }
        return null;
    }
    readRaw(key: string): any
    { 
      return  localStorage.getItem(key);
    }
}



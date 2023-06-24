import { Type } from "@angular/core";
import { BaseInterface } from "./Interfaces/BaseInterface";

export class BaseClass implements BaseInterface {
    id: number = 0;
    deleted: boolean  = false ;
    constructor() {
    }
}

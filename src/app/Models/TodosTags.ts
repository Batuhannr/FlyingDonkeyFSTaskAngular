import { BaseClass } from "../Base/BaseClass";
import { Tag } from "./Tag";
import { Todos } from "./Todos";

export class TodosTags extends BaseClass{
    TodoId : number =0;
    tagId : number = 0;
    todo !: Todos ;
    tag !: Tag;

}
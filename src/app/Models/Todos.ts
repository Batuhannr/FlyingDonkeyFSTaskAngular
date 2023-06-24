import { BaseDefinitionClass } from "../Base/BaseDefinition";
import { TodosTags } from "./TodosTags";

export class Todos extends BaseDefinitionClass{
    explanation : string ="";
    bgColour : string ="";
    todosTags : TodosTags[] =[];
}
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator((data:unknown,ctx:ExecutionContext)=>{
    // const req = ctx.switchToHttp().getRequest();
    // req.user = {id :1, name:'Falgun Mahajan '}
    // return req.user
    return {
        id:1111,
        name:"Falgun Mahajan"
    }
})
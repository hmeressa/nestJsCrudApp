import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {validate} from "class-validator";

@Injectable()
export class AuthGuards implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        /*if (request.body.name === "Hiluf") {*/
        console.log(request.map(user => {
            return user.name
        }))
        console.log(`The user information is ${request.body}`,);
        return true
    }
}

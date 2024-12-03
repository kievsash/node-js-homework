import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class BodyParametersGuard implements CanActivate {
    constructor(private readonly requiredParams: string[]) {
    }

    canActivate(context: ExecutionContext): boolean {
        const request: Request = context.switchToHttp().getRequest();
        const missingParams = this.requiredParams.filter(param => !request.body[param]);
        if (missingParams.length > 0) {
            throw new ForbiddenException(`Missing required parameters: ${missingParams.join(', ')}`);
        }
        return true;
    }
}

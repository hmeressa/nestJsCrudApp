import {
    Body,
    Controller,
    Delete,
    Get, HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put, UseGuards, UseInterceptors
} from "@nestjs/common";
import {UserService} from "../Service/user.service";
import {UserDto} from "../Dto/user.dto";
import {UserUpdateDto} from "../Dto/userUpdate.dto";
import {AuthGuards} from "../Guards/auth.guards";
import {JwtStrategy} from "../Strategy/jwt.strategy";
import {UserJwt} from "../Jwt/user.jwt";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    async findAll(): Promise<any> {
        return await this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))
                      id: number): Promise<any> {
        return await this.userService.findOneBy(id)
    }

    @Post()

    // @UseInterceptors(UseInterceptors)
    // @UseGuards(AuthGuards)
    async create(@Body() userDto: UserDto): Promise<any> {
        return await this.userService.create(userDto);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() userUpdateDto: UserUpdateDto,): Promise<any> {
        return this.userService.update(id, userUpdateDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        // @ts-ignore
        return await this.userService.delete(id);
    }
}

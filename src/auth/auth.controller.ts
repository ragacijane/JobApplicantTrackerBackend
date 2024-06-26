import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from 'src/auth/dtos/auth.dto';
import { AuthService } from 'src/auth/auth.service';
import { KorisniciService } from 'src/korisnici/korisnici.service';
import { RefreshJwtGuard } from './guard/refresh.guard';
import { BasicKorisnikDTO } from 'src/dtos/Korisnik.dto';


@Controller('auth')
export class AuthController {
    constructor(
        private korisniciService: KorisniciService,
        private authService: AuthService
    ) { }

    @Post('register')
    async registerUser(@Body() dto: BasicKorisnikDTO) {
        const { ...korisnikDetails } = dto;
        return await this.korisniciService.createKorisnici(korisnikDetails);
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        return await this.authService.login(dto);
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refreshToken(@Request() req) {
        console.log('refreshed');

        return await this.authService.refreshToken(req.user);
    }
}
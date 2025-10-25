import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.registerLocal(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: AuthenticatedRequest, @Body() loginDto: LoginDto) {
    // LocalAuthGuard will validate and put the user in req.user
    return this.authService.loginLocal(req.user);
  }

  // --- Google OAuth Routes ---

  @UseGuards(GoogleOAuthGuard)
  @Get('google')
  async googleAuth(@Req() req) {
    // This route initiates the Google OAuth flow.
    // Passport redirects to Google for authentication.
    // The actual login logic happens in GoogleOAuthStrategy's validate method.
  }

  @UseGuards(GoogleOAuthGuard)
  @Get('google/callback')
  async googleAuthRedirect(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response & { accessToken: string },
  ) {
    // This route handles the callback from Google.
    // req.user will contain the JWT payload from our GoogleOAuthStrategy.
    const jwtPayload = req.user; // Assuming GoogleOAuthStrategy returns { accessToken: string }

    // In a real application, you'd usually redirect the user to your frontend
    // with the JWT token, either in a query parameter or a cookie.
    // For this example, we'll just send it as JSON.
    // Example: res.redirect(`http://localhost:4200/dashboard?token=${jwtPayload.accessToken}`);

    // For API testing, you might just send JSON:
    res.status(200).json(jwtPayload);
  }

  // --- Protected Route Example ---

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: AuthenticatedRequest) {
    // req.user contains the user object returned by JwtStrategy
    return req.user;
  }
}

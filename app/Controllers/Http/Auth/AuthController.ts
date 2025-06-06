import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserRepository from 'App/Repositories/User/UserRepository'
import AuthService from 'App/Services/Auth/AuthService'
import UserService from 'App/Services/User/UserService'
import Base64 from 'base-64'

export default class AuthController {
  service = new AuthService()
  userService = new UserService()
  userRepository = new UserRepository()

  public async login ({ auth, request, response }: HttpContextContract) {
    try {
      const user = await this.userRepository.findByEmail(request.body().email)
      if (!user) {
        return response.error('User tidak ditemukan!')
      }

      const credentials = {
        email: user.email,
        password: request.body().password
      }

      const rememberMe = request.body().remember_me ?? false
      const token = await this.service.login(credentials, auth, rememberMe)
      return response.api(token, 'OK', 200, request)
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async logout ({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').revoke()
      return response.api(null, 'Logout successful!')
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async oauthRedirect ({ ally, response }) {
    try {
      return ally.use('google').redirect()
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async oauthCallback ({ ally, auth, response }) {
    try {
      const google = await ally.use('google').user()
      let user = await this.userRepository.findByEmail(google.email)
      if (!user) {
        return response.error('akun tidak terdaftar')
      }else{
        if (!user.google_id) {
          await this.userService.update(user.id, {
            google_id: google.id,
            status:true
          })
        }

        const authResult = await this.service.generateToken(auth, user, true)
        const encodeToken = Base64.encode(JSON.stringify(authResult))
        return response.redirect().toPath(`http://localhost:4200/google-redirect?token=${encodeToken}`)
      }
    } catch (error) {
      return response.error(error.message)
    }
  }
  public async forgotPassword ({ request, response }) {
    try {
      const data = await request.all()
      await this.service.forgotPassword(data.credential, request)
      return response.api(null, 'Forgot password link has been sent to your email')
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async restorePassword ({ request, response }) {
    try {
      const data = await request.all()
      await this.service.restorePassword(data)
      return response.api(null, 'Password restored!')
    } catch (error) {
      return response.error(error.message)
    }
  }
  getBasicAuth(authHeader: any) {
    const data = Base64.decode(authHeader.split(' ')[1]).split(':')
    return { email: data[0], password: data[1] }
  }
}

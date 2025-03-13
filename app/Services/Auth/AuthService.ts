import Hash from "@ioc:Adonis/Core/Hash"
import * as jwt from 'jsonwebtoken'
import DefaultException from "App/Exceptions/DefaultException"
import moment from 'moment'
import Base64 from 'base-64'
import Env from '@ioc:Adonis/Core/Env'
import Mail from "@ioc:Adonis/Addons/Mail"
import UserRepository from "App/Repositories/User/UserRepository"

export default class AuthService {
  userRepository = new UserRepository()

  async login (credentials: any, auth: any, rememberMe: boolean) {
    try {
      const user = await this.userRepository.findByEmail(credentials.email)
      if (!user || !(await Hash.verify(user.password, credentials.password))) {
        throw new DefaultException('Password atau email salah!')
      }
  
      return await this.generateToken(auth, user, rememberMe)
    } catch (error) {
      throw error
    }
  }

  async forgotPassword (credential, request) {
    try {
      const user = await this.userRepository.findByEmail(credential)
      if (!user) {
        throw new DefaultException('User not found')
      }

      const token = await this.generateRestorePasswordToken(user)
      const restoreUrlWithToken = request.header('origin') + 'reset-password?token=' + token

      await this.sendEmailRestorePassword(user.email, restoreUrlWithToken)
    } catch (error) {
      throw error
    }
  }

  async restorePassword (request) {
    try {
      const { expiresIn, credential } = await this.decryptToken(request.token)
      if (!this.checkExpirationToken(expiresIn)) {
        throw new DefaultException('Token expired')
      }

      const user = await this.userRepository.findByEmail(credential)
      if (!user) {
        throw new DefaultException('User tidak ditemukan!')
      }

      await this.userRepository.update(user.id, {
        pwd: await Hash.make(request.pwd)
      })
    } catch (error) {
      throw error
    }
  }

  async generateToken(auth: any, user: any, rememberMe: boolean) {
    try {
      const expiresIn = rememberMe ? '7days' : '4hours'
      const token = await auth.use('api').generate(user, {expiresIn})
      const jwtToken = jwt.sign({user}, 'PeSgVkYp3s6v9y$B&E)H@McQfTjWnZq4', {expiresIn: rememberMe ? '7d' : '4h'})
      return { token: token.token, jwtToken }
    } catch (error) {
      throw error
    }
  }

  async generateRestorePasswordToken (user) {
    try {
      const expiresIn = moment().add(30, 'm')
      const token = Base64.encode(expiresIn + ';' + user.email)
      return token
    } catch (error) {
      throw error
    }
  }

  async decryptToken (token) {
    try {
      const encrypt = Base64.decode(token).split(';')
      const result = {
        expiresIn: encrypt[0],
        credential: encrypt[1]
      }
      return result
    } catch (error) {
      throw error
    }
  }

  async sendEmailRestorePassword (email, token) {
    try {
      await Mail.send((message) => {
        message
          .from(Env.get('SMTP_USERNAME'), 'Me')
          .to(email)
          .subject('Restore Password!')
          .htmlView('emails/restore_password', { token })
      })
    } catch (error) {
      throw error
    }
  }

  checkExpirationToken (expiresIn) {
    return expiresIn > moment()
  }

}

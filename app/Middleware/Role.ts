import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthException from 'App/Exceptions/AuthException'

export default class Role {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>, allowedRoles: string[]) {
    if (allowedRoles.length == 0) {
      await next()
    } else {
      try {
        const roleId = (await auth.use('api').authenticate()).roles
        const role = await this.roleService.find(roleId)        
        if (allowedRoles.includes(role.code)) {
          await next()
        } else {
          throw new AuthException('Forbidden!', 403, 'E_UNAUTHORIZED_ACCESS')
        }
      } catch (e) {
        throw new AuthException('Forbidden!', 403, 'E_UNAUTHORIZED_ACCESS')
      }
    }
  }
}

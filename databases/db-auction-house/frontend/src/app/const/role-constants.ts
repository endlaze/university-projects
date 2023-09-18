export const CREATE_ROLES = [
  { currentRole: "Administrador", validRole: "Agente", route: "/agent" },
  { currentRole: "Agente", validRole: "Participante", route: "/part" },
  { currentRole: "Participante", validRole: "", route: "" }
]

export const ROLE_ROUTES = [
  { role: 'Administrador', route: "/admin" },
  { role: 'Agente', route: "/agent" },
  { role: 'Participante', route: "/part" }
]

export function getRole(currentRole) {
  return CREATE_ROLES.find((role) => {
    return role.currentRole === currentRole
  })
}

export function getRoute(currentRole) {
  return ROLE_ROUTES.find((role) => {
    return role.role === currentRole
  }).route
}
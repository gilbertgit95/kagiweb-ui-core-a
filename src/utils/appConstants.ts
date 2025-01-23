export const scopeAccess:{[key:string]:Set<string>} = {
    'app': new Set<string>(['app', 'account', 'workspace']),
    'account': new Set<string>(['account', 'workspace']),
    'workspace': new Set<string>(['workspace'])
}
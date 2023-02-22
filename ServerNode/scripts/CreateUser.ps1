# Pega os valores dos parâmetros passados na linha de comando
$Username = $args[0]
$Password = $args[1]
$DisplayName = $args[2]
$Email = $args[3]
$GroupName = $args[4]

# Carrega o módulo ActiveDirectory
Import-Module ActiveDirectory

# Busca o grupo especificado
$Group = Get-ADGroup -Filter {Name -eq $GroupName}

$DomainDN = Get-ADDomain | Select-Object -ExpandProperty DistinguishedName

# Cria um novo usuário no Active Directory
if (Get-ADUser -Filter {UserPrincipalName -eq $UPN}) {
    Write-Error "O nome de usuário $UPN já está em uso. Por favor, escolha outro nome de usuário."
} else {
    New-ADUser -Name $Username -DisplayName $Username -UserPrincipalName $Email -AccountPassword (ConvertTo-SecureString $Password -AsPlainText -Force) -Enabled $true -Path "OU=Usuarios,$DomainDN" -Server "SERVER01.duozin.local" -PassThru -ErrorVariable error
}



# Adiciona o usuário ao grupo especificado
Add-ADGroupMember -Identity $Group -Members $Username


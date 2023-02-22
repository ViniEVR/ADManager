# Pega os valores dos parâmetros passados na linha de comando
$Username = $args[0]
$Password = $args[1]
$DisplayName = $args[2]
$Email = $args[3]

# Carrega o módulo ActiveDirectory
Import-Module ActiveDirectory

# Cria um novo usuário no Active Directory
New-ADUser -Name $DisplayName -SamAccountName $Username -UserPrincipalName $Email -AccountPassword (ConvertTo-SecureString $Password -AsPlainText -Force) -Enabled $true

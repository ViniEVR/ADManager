$Username = $args[0]
$Password = ConvertTo-SecureString $args[1] -AsPlainText -Force
$DisplayName = $args[2]
$Email = $args[3]

$UserPrincipalName = $Username + "duozin.local.com.br"
$SAMAccountName = $Username

$ADUserParams = @{
    Name = $DisplayName
    GivenName = $DisplayName
    Surname = $DisplayName
    DisplayName = $DisplayName
    UserPrincipalName = $UserPrincipalName
    SamAccountName = $SAMAccountName
    AccountPassword = $Password
    Enabled = $true
    EmailAddress = $Email
}

New-ADUser @ADUserParams -PassThru
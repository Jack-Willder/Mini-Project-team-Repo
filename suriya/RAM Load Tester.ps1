$userinput = Read-Host "Enter tab count in multiple of 10";
$limit = [System.Int32]::Parse($userinput) * 10;

    if ( $limit -gt 500 ) {
        Write-Host "You Shall Not Pass!";
        return;
    }
for ( $i=0; $i -lt $limit; $i++ ) {
    Write-Host "COUNTER : $($i+1)";
    Start-Process brave.exe "google.com"
}
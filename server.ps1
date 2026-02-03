# Servidor HTTP Simples em PowerShell
# Execute este script para iniciar o servidor local

$port = 8080
$path = $PSScriptRoot

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   QUIZ - SEGREDOS DO ORGASMO" -ForegroundColor Magenta
Write-Host "   Servidor Local" -ForegroundColor Magenta
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Iniciando servidor na porta $port..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Acesse no navegador:" -ForegroundColor Green
Write-Host "http://localhost:$port" -ForegroundColor White
Write-Host ""
Write-Host "Para parar o servidor, pressione Ctrl+C" -ForegroundColor Yellow
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

$mimeTypes = @{
    ".html" = "text/html"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".json" = "application/json"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".webp" = "image/webp"
    ".woff" = "font/woff"
    ".woff2" = "font/woff2"
    ".ttf"  = "font/ttf"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath
        if ($localPath -eq "/") { $localPath = "/index.html" }
        
        $filePath = Join-Path $path $localPath.TrimStart("/")
        
        if (Test-Path $filePath -PathType Leaf) {
            $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = $mimeTypes[$extension]
            if (-not $contentType) { $contentType = "application/octet-stream" }
            
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $contentType
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
            
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] GET $localPath - 200 OK" -ForegroundColor Green
        } else {
            $response.StatusCode = 404
            $errorMsg = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 - Arquivo nao encontrado</h1>")
            $response.ContentType = "text/html"
            $response.ContentLength64 = $errorMsg.Length
            $response.OutputStream.Write($errorMsg, 0, $errorMsg.Length)
            
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] GET $localPath - 404 Not Found" -ForegroundColor Red
        }
        
        $response.Close()
    }
} finally {
    $listener.Stop()
    Write-Host "Servidor encerrado." -ForegroundColor Yellow
}

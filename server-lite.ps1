$H = New-Object Net.HttpListener
$H.Prefixes.Add("http://localhost:8085/")
$H.Start()
Write-Host "Server running at http://localhost:8085"
while ($H.IsListening) {
    $C = $H.GetContext()
    $R = $C.Response
    $ReqUrl = $C.Request.Url.LocalPath
    if ($ReqUrl -eq "/") { $ReqUrl = "/index.html" }
    $F = "$PWD$ReqUrl"
    
    if (Test-Path $F -PathType Leaf) {
        try {
            $B = [IO.File]::ReadAllBytes($F)
            if ($F.EndsWith(".css")) { $R.ContentType = "text/css" }
            if ($F.EndsWith(".js")) { $R.ContentType = "application/javascript" }
            if ($F.EndsWith(".html")) { $R.ContentType = "text/html" }
            if ($F.EndsWith(".mp4")) { $R.ContentType = "video/mp4" }
            
            $B = [IO.File]::ReadAllBytes($F)
            $R.ContentLength64 = $B.Length
            $R.OutputStream.Write($B, 0, $B.Length)
        } catch {
            $R.StatusCode = 500
        }
    } else {
        $R.StatusCode = 404
    }
    $R.Close()
}

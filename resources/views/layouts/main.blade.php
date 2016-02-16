<html>
<head>
    <meta charset="utf-8">
    <title>Google Map Javascript API Test</title>
    @yield("header")
</head>
<body>
    @yield('preloader')
<div class="container">
    @yield("content")
</div>

<!-- Build jQuery -->
<script src="{{ asset('js/jquery-2.2.0.min.js')}}"></script>
<!-- Build Stripe -->

@yield("footer")

</body>
</html>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Language" content="pl">
    <meta http-equiv="Content-type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>G1 Polish</title>
    <link rel="apple-touch-icon" sizes="180x180" href="public/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="public/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="public/favicon/favicon-16x16.png">
    <link rel="manifest" href="public/favicon/site.webmanifest">
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
    <link rel="stylesheet" href="public/stylesheets/bootstrap.min.css">
    <link rel="stylesheet" href="public/stylesheets/index.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand" href="/">G1 Polish</a>
            <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse" id="navbarNav" style="">
                <ul class="navbar-nav ml-md-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="about">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="contact">Contact</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="privacy-policy">Privacy Policy</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <main role="main">
        <section class="jumbotron text-center">
            <div class="container">
                <h1 class="jumbotron-heading">Ćwicz test G1 w języku polskim</h1>
                <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                <p>
                    <a href="#rules-start" class="btn btn-primary my-2">Przepisy drogowe</a>
                    <a href="#signs-start" class="btn btn-primary my-2">Znaki drogowe</a>
                </p>
            </div>
        </section>
        <div class="album py-5 bg-light">
            <div class="container">

                <div class="row">
                    <div id="rules-start" class="col-md-6 px-md-4">
                        <div class="card mb-4 shadow-sm">
                            <div class="text-center pt-3"><i class="fas fa-10x fa-book-open"></i></div>
                            <div class="card-body">
                                <p class="card-text text-center">Losowe pytania dotyczące reguł drogowych.<br>
                                    <small class="text-muted text-center">40 Questions</small>
                                </p>
                                <button id="rule-40" type="button" class="btn btn-outline-secondary w-100">Początek</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 px-md-4">
                        <div class="card mb-4 shadow-sm">
                            <div class="text-center pt-3"><i class="fas fa-10x fa-book-open"></i></div>
                            <div class="card-body">
                                <p class="card-text text-center">Wszystkie pytania dotyczące zasad drogowych.<br>
                                    <small class="text-muted text-center">108 Questions</small>
                                </p>
                                <button id="rule-all" type="button" class="btn btn-outline-secondary w-100">Początek</button>
                            </div>
                        </div>
                    </div>
                    <div id="signs-start" class="col-md-6 px-md-4 soon">
                        <div class="card mb-4 shadow-sm">
                            <div class="text-center pt-3"><i class="fab fa-10x fa-product-hunt"></i></div>
                            <div class="card-body">
                                <p class="card-text text-center">Pytania dotyczące losowych znaków drogowych.<br>
                                    <small class="text-muted text-center">Wkrótce</small>
                                </p>
                                <button type="button" class="btn btn-outline-secondary w-100">Początek</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 px-md-4 soon">
                        <div class="card mb-4 shadow-sm">
                            <div class="text-center pt-3"><i class="fab fa-10x fa-product-hunt"></i></div>
                            <div class="card-body">
                                <p class="card-text text-center">Wszystkie pytania dotyczące znaków drogowych.<br>
                                    <small class="text-muted text-center">Wkrótce</small>
                                </p>
                                <button type="button" class="btn btn-outline-secondary w-100">Początek</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <footer class="py-4 text-muted">
        <div class="text-center">
            <p>Wykonane z <i style="color: red" class="fas fa-heart"></i> do Polaków w Ontario</p>
        </div>
    </footer>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script>
        $("body").on("click","#rule-40",function(){
            if(!Cookies.get('total_questions')){
                Cookies.set('total_questions',40, { expires: 30 });
            }
            else if(Cookies.get('total_questions') != 40){
                Cookies.remove('position');
                Cookies.remove('table_correct');
                Cookies.remove('question_array');
                Cookies.remove('error');
                Cookies.set('total_questions',40, { expires: 30 });
            }
            window.location.href += 'g1-practise';
        });

        $("body").on("click","#rule-all",function(){
            if(!Cookies.get('total_questions')){
                Cookies.set('total_questions',108, { expires: 30 });
            }
            else if(Cookies.get('total_questions') != 108){
                Cookies.remove('position');
                Cookies.remove('table_correct');
                Cookies.remove('question_array');
                Cookies.remove('error');
                Cookies.set('total_questions',108, { expires: 30 });
            }
            window.location.href += 'g1-practise';
        });

        $("body").on("click touchstart","body",function(){});
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
</body>
</html>

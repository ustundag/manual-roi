from django.shortcuts import render, HttpResponse

# Create your views here.
def index(request):
    #return HttpResponse("index")
    return render(request, "index.html")

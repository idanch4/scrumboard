from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator

from rest_framework import views, status
from rest_framework.response import Response

from .serializers import UserSerializer


class LoginView(views.APIView):

    # login demands a csrf token (for security)
    @method_decorator(csrf_protect)
    def post(self, request):
        user = authenticate(
            username=request.data.get("username"),
            password=request.data.get("password")
        )
        if user is None or not user.is_active:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username or password incorrect'
            })
        login(request, user)
        return Response(UserSerializer(user).data)


class LogoutView(views.APIView):

    def get(self, request):
        logout(request)
        return Response({}, status.HTTP_204_NO_CONTENT)

from rest_framework import viewsets, response
from rest_framework.decorators import action
from orders.models import OnSiteOrder, OnlineOrder
from orders.serializers import OnSiteOrderSerializer, OnlineOrderSerializer
from locations.models import Workplace

class ReportViewSet(viewsets.ViewSet):

  @action(detail=False, methods=['post'])
  def find_report(self, request):
    branch = request.data.pop('branch')
    orders = []
    if branch != '':
      #return response.Response({"caca":int(branch) })
      orders = OnSiteOrderSerializer(OnSiteOrder.objects.filter(branch=int(branch)), many=True).data
      
      #orders = OnSiteOrderSerializer(orders, many=True).data
    else:
      on_site_orders = OnSiteOrderSerializer(OnSiteOrder.objects.all(), many=True).data
      online_orders = OnlineOrderSerializer(OnlineOrder.objects.all(), many=True).data
      orders = online_orders + on_site_orders
    return response.Response(orders)

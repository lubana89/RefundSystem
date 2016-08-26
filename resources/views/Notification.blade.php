<div style="margin:2%">
    <button class="btn btn-success" ng-click="notification.Back()"><span class="glyphicon glyphicon-arrow-left"> Back </span></button>
    <button class="btn btn-primary" ng-click="notification.refresh()"><span class="glyphicon glyphicon-refresh"> Refresh </span></button>
    <button class="btn btn-danger" ng-click="notification.logout()"><span class="glyphicon glyphicon-log-out"> Sign Out</span></button>
</div>


<div class="table-responsive" >
    <table class="table table-bordered">
        <tr>
            <th>From</th>
            <th>Message</th>
            <th>Date</th>
            <th>Mark as</th>
        </tr>
        <tbody ng-repeat="NotificationMessage in notification.NotificationsGrid">
        <tr ng-class="NotificationMessage.Read == 0 ? 'UNREAD' : 'READ'" >
            <td >{{NotificationMessage.From}}</td>
            <td>{{NotificationMessage.Message}}</td>
            <td>{{NotificationMessage.Date}}</td>
            <td><button  ng-if="NotificationMessage.Read == 0"  class="btn btn-success" ng-click="notification.MarkRead(NotificationMessage.Id)" >Read</button>
            <button ng-if="NotificationMessage.Read == 1" class="btn btn-danger " ng-click="notification.MarkUnRead(NotificationMessage.Id)" >UnRead</button></td>

        </tr>
        </tbody>
    </table>
</div>
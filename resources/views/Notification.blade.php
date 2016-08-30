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
            <th>Reply</th>
            <th>Message Chain</th>
        </tr>
        <tbody ng-repeat="NotificationMessage in notification.NotificationsGrid">
        <tr ng-class="NotificationMessage.Read == 0 ? 'UNREAD' : 'READ'" >
            <td >{{NotificationMessage.From}}</td>
            <td>{{NotificationMessage.Message}}</td>
            <td>{{NotificationMessage.Date}}</td>
            <td><button  ng-if="NotificationMessage.Read == 0"  class="btn btn-success" ng-click="notification.MarkRead(NotificationMessage.Id)" ><span class="glyphicon glyphicon-ok"> Read </span></button>
            <button ng-if="NotificationMessage.Read == 1 && NotificationMessage.ParentId==null" class="btn btn-danger " ng-click="notification.MarkUnRead(NotificationMessage.Id)" ><span class="glyphicon glyphicon-remove"> UnRead </span></button></td>
            <td><button class="btn btn-primary"   ng-click="notification.ReplyMessage(NotificationMessage)" ><span class="glyphicon glyphicon-share-alt"> Reply </span></button></td>
            <td><button ng-if="NotificationMessage.ParentId != null " class="btn btn-primary" ng-click="notification.MessageChain(NotificationMessage.Id)" ><span class="glyphicon glyphicon-retweet"></span></button></td>
            <td><button class="btn btn-primary"  ng-if="notification.Role=='Admin'" ng-click="notification.ForwardNotification(NotificationMessage.Id)" ><span class="glyphicon glyphicon-share-alt"> forward </span></button></td>
        </tr>
        </tbody>
    </table>
</div>

<div id="messageDiv" class="panel panel-info" hidden>
    <div class="panel-body">
        <ul class="media-list" ng-repeat="message in notification.Messages">
            <message class="media" ></message>
        </ul>
    </div>
</div>
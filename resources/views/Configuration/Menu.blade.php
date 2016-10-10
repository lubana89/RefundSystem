<script>
    $(document).ready(function() {
        $('.drawer').drawer();
    });
</script>
<div class="drawer drawer--left" ng-controller="MenuController as menu">
    <div role="banner">
        <button type="button" class="drawer-toggle drawer-hamburger">
            <span class="sr-only">toggle navigation</span>
            <span class="drawer-hamburger-icon"></span>
        </button>
        <nav class="drawer-nav" role="navigation">
            <ul class="drawer-menu">
                <li class="drawer-brand">MENU</li>
                <li><a class="drawer-menu-item" href ng-if="menu.Role!='Warehouse'" ng-click="menu.ToUserPage()">Home</a></li>
                <li><a class="drawer-menu-item" href ng-if="menu.Role!='Warehouse'" ng-click="menu.ToSellerForm()">Fill Form</a></li>
                <li><a class="drawer-menu-item" href ng-click="menu.AllNotifications()"> Notification Inbox</a></li>
                <li><a class="drawer-menu-item" href  ng-if="menu.Role=='Admin'" ng-click="menu.ToUserGrid()">Manage User</a></li>
                <li><a class="drawer-menu-item" href  ng-if="menu.Role!='Seller'" ng-click="menu.ToWarehouseGrid()">Warehouse</a></li>
                <li><a class="drawer-menu-item" href  ng-click="menu.logout()">Sign Out</a></li>
            </ul>
        </nav>
    </div>
</div>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
    <link href="/RefundSystem/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/RefundSystem/Elixer/CSS/all.css">
    <script src="/RefundSystem/Elixer/JS/Dependencies.js"></script>
    <script src="/RefundSystem/Elixer/JS/Controllers/Customer.js"></script>

    @include('Configuration.Configuration')
</head>

<body>
<div ng-app="Customer" ng-controller="CustomerRefundTrackCtrl" ng-init="init()">
    <div class=" ui-widget-overlay">
        <div class="col-sm-5 " style="margin-top:20%;">

            <form name="AuthForm" ng-submit="SubmitForm()">

                <div class="form-group">
                    <fieldset>
                        <label>Please enter your TrackID</label>
                        <input name="trackID" class="trackerID form-control" placeholder="TrackID" required/>
                    </fieldset>
                </div>
                <button type="submit" class="btn btn-primary trackBtn"><span class="glyphicon glyphicon-log-in"></span>
                </button>
            </form>
        </div>
        <h1 class="col-sm-1 text_loginPage" style="padding-left:5%">or</h1>
        <div class="col-sm-5" style="margin-top:20%; padding-left: 12%">
            <button class="returnBtn" ng-click="openDialog()">I want to return an item<p>generate a new case</p>
            </button>
        </div>
    </div>
    <div class="dialogForm" title="Eingabe" hidden>
        <div>
            <form class="rqstform">
                <div class="form-group">
                    <input name="sellerName" class="form-control" placeholder="Sellers Name" required/>
                </div>
                <div class="form-group">
                    <input name="email" class="form-control" placeholder="Email" required/>
                </div>
                <div class="form-group">
                    <input name="orderNr" class="form-control" placeholder="Ordernumber" required/>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary" ng-click="send()"><span
                                class="glyphicon glyphicon-log-in"></span></button>
                    <button type="button" class="btn btn-danger" ng-click="close()"><span
                                class="glyphicon glyphicon-remove"></span></button>
                </div>
            </form>
        </div>
    </div>

</div>
</body>
</html>
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
        <div id="wrapper">
            <form  class="form-horizontal" id="formElem" name="CustomerForm" novalidate role="form"
                  ng-submit="CustomerForm.$valid && send()">
                <fieldset class="step">
                    <legend>Sender:</legend>
                    <div class="form-group">
                        <label for="name" class="col-sm-5 control-label"> Name</label>
                        <div class="col-sm-7">
                            <input class="form-control" ng-model="form.name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="email" class="col-sm-5 control-label"> Email</label>
                        <div class="col-sm-7">
                            <input class="form-control" name="email" ng-model="form.emailAddress"
                                   ng-pattern="/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/">
                            <span ng-show="CustomerForm.email.$error.pattern">Not a valid mail!</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="street" class="col-sm-5 control-label"> Street</label>
                        <div class="col-sm-7">
                            <input class="form-control" ng-model="form.street">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="plz" class="col-sm-5 control-label"> PLZ</label>
                        <div class="col-sm-7">
                            <input class="form-control" ng-model="form.plz">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="city" class="col-sm-5 control-label"> City</label>
                        <div class="col-sm-7">
                            <input class="form-control" ng-model="form.city">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="country" class="col-sm-5 control-label"> Country</label>
                        <div class="col-sm-7">
                            <input class="form-control" ng-model="form.country">
                        </div>
                    </div>
                </fieldset>
                <fieldset class="step">
                    <legend>Order:</legend>
                    <div class="form-group">
                        <label for="orderId" class="col-sm-5 control-label">Order Number</label>
                        <div class="col-sm-7">
                            <input class="form-control" ng-model="form.orderNumber">
                        </div>
                    </div>
                </fieldset>
                <fieldset class="step">
                    <legend>Bank:</legend>
                    <div class="form-group">
                        <label for="BankAccountHolderName" class="col-sm-5 control-label">Account Holder Name</label>
                        <div class="col-sm-7">
                            <input class="form-control" ng-model="form.bankAccountHolderName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="IBAN" class="col-sm-5 control-label">IBAN</label>
                        <div class="col-sm-7">
                            <input class="form-control" ng-model="form.IBAN">
                        </div>
                    </div>
                </fieldset>
                <fieldset class="step">
                    <legend>Item:</legend>
                    <div class="form-group">
                        <label for="reason" class="col-sm-5 control-label">Reason</label>
                        <div class="col-sm-7">
                            <select ng-model="form.reason" ng-options="x for x in reasons">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="itemCondition" class="col-sm-5 control-label">Item Condition</label>
                        <div class="col-sm-7">
                            <select ng-model="form.condition" ng-options="x for x in conditions">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="wish" class="col-sm-5 control-label">Wish</label>
                        <div class="col-sm-7">
                            <select ng-model="form.wish" ng-options="x for x in wishes">
                            </select>
                        </div>
                    </div>

                </fieldset>
                <fieldset class="step">
                    <legend>Send Mail</legend>
                    <div class="form-group">
                        <div >
                            <button type="submit" class="btn btn-primary"><span
                                        class="glyphicon glyphicon-log-in"></span></button>
                            <button type="button" class="btn btn-danger" ng-click="close()"><span
                                        class="glyphicon glyphicon-remove"></span></button>
                        </div>
                    </div>
                </fieldset>

            </form>
        </div>
    </div>

</div>
</body>
</html>
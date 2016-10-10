<div data-ng-include="getGlobals('configuration_MenuPath')"></div>

<div ng-controller="SellerRefundFormCtrl">
    <div class="btn-group" style="margin:2%">
        <button class="btn btn-success" ng-click="Back()"><span class="glyphicon glyphicon-arrow-left"> Back </span>
        </button>
    </div>
    <script type="text/javascript" src="/RefundSystem/Elixer/JS/sliding.form.js"></script>
    <div id="content">
        <div id="wrapper">
            <div id="steps">
                <form class="form-horizontal" id="formElem" name="SellerForm" novalidate role="form" style="margin-top:5%;"
                      ng-submit="SellerForm.$valid && SubmitForm()">

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
                                <span ng-show="SellerForm.email.$error.pattern">Not a valid mail!</span>
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

                        <div class="form-group">
                            <label for="date" class="col-sm-5 control-label">Date</label>
                            <div class="col-sm-7">
                                <input class="form-control date" type="text" jqdatepicker ng-model="form.date">
                            </div>
                        </div>

                    </fieldset>

                    <fieldset class="step">
                        <legend>Bank:</legend>
                        <div class="form-group">
                            <label for="BankAccountHolderName" class="col-sm-5 control-label">Kontoinhaber</label>
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
                            <label for="itemSKU" class="col-sm-5 control-label">Item SKU</label>
                            <div class="col-sm-7">
                                <input class="form-control" ng-model="form.itemSKU">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="price" class="col-sm-5 control-label">Price</label>
                            <div class="col-sm-7">
                                <input class="form-control" ng-model="form.price">
                            </div>
                        </div>
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
                        <legend>Generate Link:</legend>
                        <div class="form-group">
                            <div>
                                <p class="submit">
                                <button type="submit"  id="refundButton" class="btn btn-success">Generate Refund Link</button>
                                </p>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div id="navigation" style="display:none;">
                <ul>
                    <li class="selected">
                        <a href="#">Sender</a>
                    </li>
                    <li>
                        <a href="#">Order</a>
                    </li>
                    <li>
                        <a href="#">Bank</a>
                    </li>
                    <li>
                        <a href="#">Item</a>
                    </li>
                    <li>
                        <a href="#">Confirm</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>






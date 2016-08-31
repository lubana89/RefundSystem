
<div ng-controller="UploaderCntrl" nv-file-drop="" uploader="uploader" filters="queueLimit, customFilter">
    <div style="margin:2%">
        <button class="btn btn-success" ng-click="Back();"><span class="glyphicon glyphicon-arrow-left"> Back </span></button>

    </div>
<div class="container">

    <div class="row">

        <div class="col-md-3 upload">


            <input  type="file" nv-file-select="" uploader="uploader" multiple  /><br/>

        </div>

        <div class="col-md-9" style="margin-bottom: 40px">

            <h3>Upload queue</h3>
            <p>Queue length: {{ uploader.queue.length }}</p>

            <table class="table">
                <thead>
                <tr>
                    <th width="50%">Name</th>
                    <th ng-show="uploader.isHTML5">Size</th>
                    <th ng-show="uploader.isHTML5">Progress</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr ng-repeat="item in uploader.queue">
                    <td><strong>{{ item.file.name }}</strong></td>
                    <td ng-show="uploader.isHTML5" nowrap>{{ item.file.size/1024/1024|number:2 }} MB</td>
                    <td ng-show="uploader.isHTML5">
                        <div class="progress" style="margin-bottom: 0;">
                            <div class="progress-bar" role="progressbar" ng-style="{ 'width': item.progress + '%' }"></div>
                        </div>
                    </td>
                    <td class="text-center">
                        <span ng-show="item.isSuccess"><i class="glyphicon glyphicon-ok"></i></span>
                        <span ng-show="item.isError"><i class="glyphicon glyphicon-remove"></i></span>
                    </td>
                    <td nowrap>
                        <button type="button" class="btn btn-success btn-xs" ng-click="item.upload()" ng-disabled="item.isReady || item.isUploading || item.isSuccess">
                            <span class="glyphicon glyphicon-upload"></span> Upload
                        </button>
                        <button type="button" class="btn btn-danger btn-xs" ng-click="item.remove()">
                            <span class="glyphicon glyphicon-trash"></span> Remove
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>

    </div>

</div>

</div>
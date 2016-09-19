
<div style="margin: 0 auto;width: 500px;height: 500px">
    <h4 style="color:red">Download & Stick it To Your Item</h4>
    <img id="barcode"/>
    <button  type="button" class="btn btn-danger">Download PDF</button>
</div>
<link rel="stylesheet" href="/RefundSystem/bower_components/bootstrap/dist/css/bootstrap.css">
<script src="/RefundSystem/bower_components/jspdf/dist/jspdf.min.js"></script>
<script src="/RefundSystem/bower_components/JsBarcode/dist/JsBarcode.all.min.js"></script>
<script type="application/javascript">
    var data={!! $Data !!}
    JsBarcode("#barcode", data,{displayValue:false});
</script>
<script>
    function svg_to_pdf(svg, callback) {
        svgAsDataUri(svg, {}, function(svg_uri) {
            var image = document.createElement('img');

            image.src = svg_uri;
            image.onload = function() {
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');

                var dataUrl;
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0, image.width, image.height);
                dataUrl = canvas.toDataURL('image/jpeg');
                doc.addImage(dataUrl, 'JPEG', 0, 0, image.width, image.height);

                callback(doc);
            }
        });
    }
    function download_pdf(name, dataUriString) {
        var link = document.createElement('a');
        link.addEventListener('click', function(ev) {
            link.href = dataUriString;
            link.download = name;
            document.body.removeChild(link);
        }, false);
        document.body.appendChild(link);
        link.click();
    }
    document.querySelector("button").addEventListener("click", function () {
        var image=document.querySelector("img");
        var doc = new jsPDF('portrait', 'pt');
        doc.addImage(image.src, 'JPEG', 100, 200, image.width, image.height);
        var trackingID={!! json_encode($TrackingID) !!}
        doc.setFont("helvetica");
        doc.setFontType("bold");
        doc.setFontSize(9);
        doc.setTextColor(255,0,0);
        doc.textWithLink('Click To Check Status',10, 20,{ url:  trackingID  });
        download_pdf('RefundCode.pdf', doc.output('dataurlstring'));

    });
</script>
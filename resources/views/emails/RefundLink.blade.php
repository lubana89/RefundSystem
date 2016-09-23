<style>

    .btn {
        background-color: #f44336;
        color: #ffffff;
        display: inline-block;
        font-size: 16px;
        margin-left: 20px;
        opacity: 0.9;
        padding: 14px 25px;
        text-align: center;
        text-decoration: none;
    }
</style>
Dear {!! $name !!},
<br/>
<br/>
Following is the <b>Refund Link</b> for the Item you have requested.
<br/>
<br/>
<a class="btn" href={!! $link !!} target="_blank">Refund Item Link</a>

<br/>
<br/>
Regards
<br/>
Team OUBO


<?php if (empty($frameworkErr)) : ?>
{
    "success": true, 
    "msg": "Record added." , 
    "records": 
    [
        {
            "id":"<?php echo $patientTemplateId ?>"
        }
    ]
}
<?php else : ?>
{
    "success": false, 
    "msg": "No records found.", 
    "frameworkErr": "<?php echo $frameworkErr ?>"
}
<?php endif; ?>
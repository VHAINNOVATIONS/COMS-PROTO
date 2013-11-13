<?php

class Search extends Model {
    
    function getSearchResults() {
        
		/* Passed Keywords */
		$q = str_replace("'","''",$_GET['q']);
		
		/* SQL Query */
		$query = "SELECT Description FROM LookUp WHERE Description LIKE '%{$q}%' AND LookUp_Type = 25";
       
        return $this->query($query);
        
    }

}

?>

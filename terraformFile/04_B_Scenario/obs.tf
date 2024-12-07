resource "huaweicloud_obs_bucket" "medium_cost_bucket" {
  bucket        = "orta-maliyet-depo1"
  storage_class = "STANDARD_IA"  
  acl           = "private"


}

resource "huaweicloud_obs_bucket" "eva_high_cost_bucket" {
  bucket        = "eva-high-cost-depo1"
  storage_class = "STANDARD"  
  acl           = "private"
}

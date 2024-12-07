resource "huaweicloud_obs_bucket" "example_bucket" {
  bucket       = "dusuk-maliyet-depo1"
  storage_class = "DEEP_ARCHIVE"  
  acl           = "private"

   tags = {
    Environment = "Test"
    Project     = "OBS-Terraform"
  }

}


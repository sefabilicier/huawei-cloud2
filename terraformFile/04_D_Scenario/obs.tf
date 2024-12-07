resource "huaweicloud_obs_bucket" "example_medium_bucket" {
  bucket        = "example-medium-storage"
  storage_class = "STANDARD_IA"
  acl           = "private"
}


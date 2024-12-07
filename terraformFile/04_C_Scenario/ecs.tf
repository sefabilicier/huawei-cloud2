data "huaweicloud_availability_zones" "eva_az" {}

data "huaweicloud_compute_flavors" "eva_flavor" {
  availability_zone = data.huaweicloud_availability_zones.eva_az.names[0]
  performance_type  = "normal"
  cpu_core_count    = 8
  memory_size       = 16
}

data "huaweicloud_images_image" "eva_image" {
  name        = "Ubuntu 18.04 server 64bit"
  most_recent = true
}

data "huaweicloud_networking_secgroup" "eva_secgroup" {
  name = "default"
}

resource "huaweicloud_compute_instance" "eva_large_test" {
  name               = "eva_large_test_${count.index}"
  image_id           = data.huaweicloud_images_image.eva_image.id
  flavor_id          = data.huaweicloud_compute_flavors.eva_flavor.ids[0]
  availability_zone  = data.huaweicloud_availability_zones.eva_az.names[0]
  security_group_ids = [data.huaweicloud_networking_secgroup.eva_secgroup.id]
  network {
    uuid = huaweicloud_vpc_subnet.eva_subnet.id
  }
  count = 3
}

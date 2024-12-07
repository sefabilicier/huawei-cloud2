data "huaweicloud_availability_zones" "low_az" {}

data "huaweicloud_compute_flavors" "low_flavor" {
  availability_zone = data.huaweicloud_availability_zones.low_az.names[0]
  performance_type  = "normal"
  cpu_core_count    = 2
  memory_size       = 4
}

data "huaweicloud_images_image" "low_image" {
  name        = "Ubuntu 18.04 server 64bit"
  most_recent = true
}

data "huaweicloud_networking_secgroup" "low_secgroup" {
  name = "default"
}

resource "huaweicloud_compute_instance" "low_instance" {
  name               = "low-instance-${count.index}"
  image_id           = data.huaweicloud_images_image.low_image.id
  flavor_id          = data.huaweicloud_compute_flavors.low_flavor.ids[0]
  availability_zone  = data.huaweicloud_availability_zones.low_az.names[0]
  security_group_ids = [data.huaweicloud_networking_secgroup.low_secgroup.id]
  network {
    uuid = huaweicloud_vpc_subnet.low_subnet.id
  }
  count = 2
}



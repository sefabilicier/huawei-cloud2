data "huaweicloud_availability_zones" "az_info" {}

data "huaweicloud_compute_flavors" "instance_flavor" {
  availability_zone = data.huaweicloud_availability_zones.az_info.names[0]
  performance_type  = "normal"
  cpu_core_count    = 4
  memory_size       = 8
}

data "huaweicloud_images_image" "ubuntu_image" {
  name        = "Ubuntu 18.04 server 64bit"
  most_recent = true
}

data "huaweicloud_networking_secgroup" "default_secgroup" {
  name = "default"
}

resource "huaweicloud_compute_instance" "app_instance" {
  name               = "app_instance_${count.index}"
  image_id           = data.huaweicloud_images_image.ubuntu_image.id
  flavor_id          = data.huaweicloud_compute_flavors.instance_flavor.ids[0]
  availability_zone  = data.huaweicloud_availability_zones.az_info.names[0]
  security_group_ids = [data.huaweicloud_networking_secgroup.default_secgroup.id]
  network {
    uuid = huaweicloud_vpc_subnet.main_subnet.id
  }
  count = 2
}

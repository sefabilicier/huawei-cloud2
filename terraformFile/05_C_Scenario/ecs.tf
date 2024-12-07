data "huaweicloud_availability_zones" "myaz" {}

data "huaweicloud_compute_flavors" "optimized_flavor" {
  availability_zone = data.huaweicloud_availability_zones.myaz.names[0]
  performance_type  = "normal"
  cpu_core_count    = 8
  memory_size       = 32
}

data "huaweicloud_images_image" "latest_ubuntu_image" {
  name        = "Ubuntu 18.04 server 64bit"
  most_recent = true
}

data "huaweicloud_networking_secgroup" "default_security_group" {
  name = "default"
}

resource "huaweicloud_compute_instance" "web_app_ecs" {
  name               = "web_app_ecs_${count.index}"
  image_id           = data.huaweicloud_images_image.latest_ubuntu_image.id
  flavor_id          = data.huaweicloud_compute_flavors.optimized_flavor.ids[0]
  availability_zone  = data.huaweicloud_availability_zones.myaz.names[0]
  security_group_ids = [data.huaweicloud_networking_secgroup.default_security_group.id]
  network {
    uuid = huaweicloud_vpc_subnet.subnet_5c.id  
  }
  count = 2
}
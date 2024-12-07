# ECS 
data "huaweicloud_availability_zones" "myaz" {}

data "huaweicloud_compute_flavors" "myflavor" {
  availability_zone = data.huaweicloud_availability_zones.myaz.names[0]
  performance_type  = "normal"
  cpu_core_count    = 16
  memory_size       = 64
}

data "huaweicloud_images_image" "myimage" {
  name        = "Ubuntu 18.04 server 64bit"
  most_recent = true
}

data "huaweicloud_networking_secgroup" "mysecgroup" {
  name = "default"
}

resource "huaweicloud_compute_instance" "mycompute" {
  name               = "mycompute_${count.index}"
  image_id           = data.huaweicloud_images_image.myimage.id
  flavor_id          = data.huaweicloud_compute_flavors.myflavor.ids[0]
  availability_zone  = data.huaweicloud_availability_zones.myaz.names[0]
  security_group_ids = [data.huaweicloud_networking_secgroup.mysecgroup.id]
  network {
    uuid = huaweicloud_vpc_subnet.subnet1.id
  }
  count = 2
}
data "huaweicloud_availability_zones" "testaz" {}


data "huaweicloud_compute_flavors" "testflavor" {
  availability_zone = data.huaweicloud_availability_zones.testaz.names[0]
  performance_type  = "normal"
  cpu_core_count    = 2
  memory_size       = 4
}


data "huaweicloud_images_image" "testimage" {
  name        = "Ubuntu 18.04 server 64bit"
  most_recent = true
}


data "huaweicloud_networking_secgroup" "mysecgroup" {
  name = "default"
}



resource "huaweicloud_compute_instance" "mytest" {
  name               = "mytest_${count.index}"
  image_id           = data.huaweicloud_images_image.testimage.id
  flavor_id          = data.huaweicloud_compute_flavors.testflavor.ids[0]

  availability_zone  = data.huaweicloud_availability_zones.testaz.names[0]
  security_group_ids = [data.huaweicloud_networking_secgroup.mysecgroup.id]
  network {
    uuid = huaweicloud_vpc_subnet.mysubnet.id
  }
  count = 2
}











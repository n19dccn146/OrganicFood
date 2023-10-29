import Link from 'next/link';
import Flex from '~/components/common/flex';
import { DateJS } from '~/helpers/date.helper';

const Footer = () => {
  return (
    <footer className="mt-auto">
      {/* main content footer */}
      <section className="bg-[#f7f7f7]">
        <div className="container mx-auto">
          <div className="py-[5px] px-[20px]">
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-1">
                <h5 className="font-medium text-[20px]">Hệ thống cửa hàng</h5>
                <ul className="mt-[8px]">
                  <li className="my-[8px]">
                    <Link href="#!">
                      <a className="text-black">Organicfood Quận 2</a>
                    </Link>
                  </li>
                  <li className="my-[8px]">
                    <Link href="#!">
                      <a className="text-black">Organicfood Quận 1</a>
                    </Link>
                  </li>
                  <li className="my-[8px]">
                    <Link href="#!">
                      <a className="text-black">Organicfood Quận 3</a>
                    </Link>
                  </li>
                  <li className="my-[8px]">
                    <Link href="#!">
                      <a className="text-black">Organicfood Quận 9</a>
                    </Link>
                  </li>
                  <li className="my-[8px]">
                    <Link href="#!">
                      <a className="text-black">Organicfood DakLak</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-span-1">
                <h5 className="font-medium text-[20px]">Về Organicfood</h5>
                <ul className="mt-[8px]">
                  <li className="my-[8px]">
                    <Link href="#!">
                      <a className="text-black">Giới Thiệu Organicfood</a>
                    </Link>
                  </li>
                  <li className="my-[8px]">
                    <Link href="#!">
                      <a className="text-black">Làm việc với chúng tôi</a>
                    </Link>
                  </li>
                  <li className="my-[8px]">
                    <Link href="#!">
                      <a className="text-black">Chính sách bảo mật</a>
                    </Link>
                  </li>
                  <li className="my-[8px]">
                    <Link href="#!">
                      <a className="text-black">Điều khoản dịch vụ</a>
                    </Link>
                  </li>
                  <li className="my-[8px]">
                    <Link href="#!">
                      <a className="text-black">Liên hệ</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-span-1">
                <h5 className="font-medium text-[20px]">Chính sách</h5>
                <ul className="mt-[8px]">
                  <li className="my-[8px]">
                    <Link href="#!">
                      <a className="text-black">Chính sách giao hàng</a>
                    </Link>
                  </li>
                  <li className="my-[8px]">
                    <Link href="#!">
                      <a className="text-black">Chính sách mua hàng</a>
                    </Link>
                  </li>
                  <li className="my-[8px]">
                    <Link href="#!">
                      <a className="text-black">Chính sách đổi trả</a>
                    </Link>
                  </li>
                  <li className="my-[8px]">
                    <Link href="#!">
                      <a className="text-black">Chính sách bảo mật</a>
                    </Link>
                  </li>
                  <li className="my-[8px]">
                    <Link href="#!">
                      <a className="text-black">Chính sách thu mua</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-span-1">
                <h5 className="font-medium text-[20px]">Liên hệ</h5>
                <ul className="mt-[8px]">
                  <li className="my-[8px]">
                    <Link href="#!">
                      <a className="text-black">Thời gian tư vấn: 7h - 20h</a>
                    </Link>
                  </li>
                  <li className="my-[8px]">
                    <Link href="#!">
                      <a className="text-black">
                        Thời gian giao hàng: 7h30 - 20h
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* bottom footer */}
      <section className="bg-dark_3">
        <div className="container mx-auto">
          <div className="py-[5px] px-[20px]">
            <Flex alignItem="center" justifyContent="center">
              <span className="text-white text-[14px]">
                © {DateJS.getYear()} Store Organic Food. All rights reserved.
              </span>
            </Flex>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;

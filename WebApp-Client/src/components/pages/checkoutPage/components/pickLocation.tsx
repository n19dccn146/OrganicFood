import React from 'react';
import Select from 'react-select';
import ErrorText from '~/components/common/errorText';
import { API_URL } from '~/constants/api.constant';
import API from '~/services/axiosClient';
import { ReturnListResponse } from '~/services/response.interface';

const EmptyProvince = {
  label: 'Chọn thành phố',
  value: '',
};
const EmptyDistrict = {
  label: 'Chọn quận huyện',
  value: '',
};

const PickLocation = (props) => {
  const { setValue, errors, handleGetDiscount, getValues } = props;

  const [province, setProvince] = React.useState([EmptyProvince]);

  const [district, setDistrict] = React.useState([EmptyDistrict]);

  //   const [ward, setWard] = React.useState([EmptyWard]);

  const loadDistrictData_V2 = async (province) => {
    try {
      const responses = await API.get<ReturnListResponse<any>>({
        url: API_URL.DISTRICT(province),
      });
      if (!responses.error) {
        const districts = responses.data.map((dis) => ({
          label: dis.name_with_type,
          option: dis.name_with_type,
          value: dis.code,
        }));
        setValue('district', '');
        setValue('ward', '');
        setDistrict([district[0], ...districts]);
      } else throw 'Error fetching data';
    } catch {
      console.log('Error fetching data');
    }
  };

  //   const loadWardData_V2 = async (district) => {
  //     try {
  //       const responses = await API.get<ReturnListResponse<any>>({
  //         url: API_URL.WARD(district),
  //       });
  //       if (!responses.error) {
  //         const wards = responses.data.map((ward) => ({
  //           label: ward.name_with_type,
  //           option: ward.name_with_type,
  //           value: ward.code,
  //         }));
  //         setValue('ward', '');
  //         setWard([ward[0], ...wards]);
  //       } else throw 'Error fetching data';
  //     } catch {}
  //   };

  React.useEffect(() => {
    async function getProvinceList() {
      try {
        const responses = await API.get<ReturnListResponse<any>>({
          url: API_URL.PROVINCE,
        });
        if (!responses.error) {
          const provinces = responses.data.map((pro) => ({
            label: pro.name_with_type,
            option: pro.name_with_type,
            value: pro.code,
          }));
          setProvince([province[0], ...provinces]);
        } else throw 'Error fetching data';
      } catch (e) {}
    }
    getProvinceList();
  }, []);

  const _provinceOptions = province.map((e) => {
    return { label: e?.label, value: e?.value };
  });

  const _districtOptions = district.map((e) => {
    return { label: e?.label, value: e?.value };
  });

  //   const _wardOptions = ward.map((e) => {
  //     return { label: e?.label, value: e?.value };
  //   });

  const onChangeProvince = (selected) => {
    setValue('province', selected?.label);
    setValue('district', '');
    setDistrict([EmptyDistrict]);
    // setWard([EmptyWard]);

    loadDistrictData_V2(selected?.value);
  };

  const onChangeDistrict = (selected) => {
    setValue('district', selected?.label);
    handleGetDiscount({});
    // setWard([EmptyWard]);
    // loadWardData_V2(selected?.value);
  };

  //   const onChangeWard = (selected) => {
  //     setValue('ward', selected?.value);
  //   };

  const colorStyles = {
    control: (styles) => ({
      ...styles,
      overflow: 'hidden',
      color: 'black !important',
    }),
    singleValue: (styles) => ({ ...styles, color: 'black !important' }),
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
  };

  return (
    <>
      <div className="mb-[20px] relative">
        <label className="text-[14px] inline-block mb-[10px] px-[10px] pointer-events-none bg-white text-text_input">
          Tỉnh/thành phố <span className="text-red">*</span>
        </label>
        <Select
          options={_provinceOptions}
          defaultValue={_provinceOptions[0]}
          placeholder={'Tỉnh/thành phố'}
          onChange={onChangeProvince}
          styles={colorStyles}
          name={'province'}
        />
        {errors?.['province'] && (
          <ErrorText text={errors['province'].message} />
        )}
      </div>
      <div className="mb-[20px] relative">
        <label className="text-[14px] inline-block mb-[10px] px-[10px] pointer-events-none bg-white text-text_input">
          Quận/huyện <span className="text-red">*</span>
        </label>
        <Select
          options={_districtOptions}
          defaultValue={_districtOptions[0]}
          placeholder={'Quận/huyện'}
          onChange={onChangeDistrict}
          styles={colorStyles}
          name={'district'}
        />
        {errors?.['district'] && (
          <ErrorText text={errors['district'].message} />
        )}
      </div>
      {/* <div className="mb-[30px] relative">
        <label className="text-[14px] inline-block mb-[10px] px-[10px] pointer-events-none bg-white text-text_input">
          Phường/xã <span className="text-red">*</span>
        </label>
        <Select
          options={_wardOptions}
          defaultValue={_wardOptions[0]}
          placeholder={'Phường/xã'}
          onChange={onChangeWard}
          styles={colorStyles}
          name={'ward'}
        />
        {errors?.['province'] && (
          <ErrorText text={errors['province'].message} />
        )}
      </div> */}
    </>
  );
};

export default PickLocation;

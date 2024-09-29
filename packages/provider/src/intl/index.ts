const intlMap = {};

const intlMapKeys = Object.keys(intlMap);

/**
 * 根据 antd 的 key 来找到的 locale 插件的 key
 *
 * @param localeKey
 */
export const findIntlKeyByAntdLocaleKey = <T extends string>(localeKey?: T) => {
  const localeName = (localeKey || 'zh-CN').toLocaleLowerCase();
  return intlMapKeys.find((intlKey) => {
    const LowerCaseKey = intlKey.toLocaleLowerCase();
    return LowerCaseKey.includes(localeName);
  }) as T;
};

export {};

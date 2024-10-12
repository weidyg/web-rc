import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<LoginFormPageToken> = (token) => {
  const loginBoxBlur = true;
  const isDarkMode = false;
  const opacity = loginBoxBlur ? (isDarkMode ? 0.65 : 0.25) : 0.98;
  return {
    [token.componentCls]: {
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: token.colorBgLayout,
      '&-bgVideo': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        'video': {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }
      },
      '&-container': {
        zIndex: 2,
        display: 'flex',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        [`@media (max-width: ${token.screenMDMin}px)`]: {
          margin: 'auto',
          backdropFilter: 'blur(10px)',
          backgroundImage: 'radial-gradient(circle at 93% 1e+02%, rgba(22,119,255,0.17) 0%, rgba(255,255,255,0.05) 23%, rgba(255,255,255,0.03) 87%, rgba(22,119,255,0.12) 109%)',
          backgroundColor: isDarkMode ? `rgba(0, 0, 0,${opacity})` : `rgba(255, 255,255,${opacity})`,
          boxShadow: isDarkMode ? '0px 0px 24px 0px rgba(255,255,255,0.2)' : '0px 0px 24px 0px rgba(0,0,0,0.1)',
        },
      },
      '&-footer': {
        zIndex: 199,
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        backdropFilter: 'blur(10px)',
        backgroundColor: token.colorBgBlur,
        color: token.colorText,
        [`@media (max-width: ${token.screenMDMin}px)`]: {
          display: 'none',
        },
        '&-nav': {
          margin: '8px 0 0',
          lineHeight: '24px',
          textAlign: 'center',
          'a': {
            color: 'inherit',
            textDecoration: 'none',
            padding: '0 8px',
          },
        },
      },
      '&-copyright': {
        lineHeight: '24px',
        color: 'inherit',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textAlign: 'center',
        fontSize: '12px',
        'a': {
          color: 'inherit',
          paddingLeft: '8px',
          textDecoration: 'none',
        },
        '&-beian': {
          width: '20px',
          height: '20px',
          marginRight: '4px',
          display: 'inline-block',
          verticalAlign: 'sub',
          backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAABQhJREFUOE991GtQVAUUB/D/vfu6e3fZF7ssKgguIrCKwCjGTAiiIhqGWmGiNiaNQ5mapU6jkmEZPibMppDMfPTBxyRjmviIfBAKkjkCKgIujwUXBdzltdy9+7rcpi2Z6HU+nZkz/9+cL+cQ+J/i+dZAR3NdxrVLt1a5WK84OS32oH903BmCCLf8V4z4twHPlqU8LL38ZuXFxgyeNVGPXDQEahVCtBRYK+1NnGk4F/XiS4cJKrbk7/l/gDzPU1c/X8FuzW/Eshd4xMk4jGP6IFHT6E9NRLWVxt71lfhwcwjmbDxBEQTh+is6AuR5W5CruuDY4py6pFmpNLLJaph3mcHHB0Kio8GU1CP6UCpO69Jxakc5vjuaeI6IWLiYIMY5n6HDoIs3R3WW7KrJzOkQRyaPwuH4Sjz4ogcCDMEtI0GPUcBR04UBxo2kHzKx5vx41J8tw8kj054QuoAUXeT6xt/RYZBnCuMLi8y31myU40RBA+bVVsByzAZyshbocsIz4IZgkj+YqhYYVkTg7rJMzJrTh4J8Kda+Io0TT8irGQZttdeClD2FJ/bfMSaue9+F87lViK5sBVvaCS5EDWIsDZAAb3bC1fYEVFIoiL2vIjLeidzNND7e5HcN1Oo3CKmq1bdh7feb3pnA3NhXzKTjtRw3Sg48xMyuFtRvq4Y3Kxyy6f5QGrXg7jjQv/M6gpYbYV40HVOSOBTu02H1rHuwyZbt0BoWfOADm0rzv/JrPp3TpJ+L55fqsG5pLT7NbkfZbjPk/S4ojToI/SiQTg7eYCUilwRjy0ccdn4zChVXFIix/4g+1YKjQTPeXekDG0+u7SBbfh0dMPs5TNwYic6bD3Ax7SfETNPhaaUNDoaF3KCBt80OdYwKvQ4JEr41Qm40wHSyFz1XfgZGRzeFLvo63AeairMZ++0GOm66Ehtq0rF3awcuoAhpE914mBCOnl4GqjB/aPwoBJyqQ/k9DinIwlvbxmN/WgXul3dDFT+pLXh2UagPtFzIO+vqKs8IiTagvi8M0SskmN9xCqsUdfCnvSCVUogBKMYHYMAuxKEbUhQpZuPW8SHEBbHoNHdAOiZuv3bK1rf/BLffdJrKEsSBAQiOUuKTK1OQu6kF4HoB3oMMhQ0aFYnidj8MggagxntbaBS8bsJjEzDE2ECNjanQJexM9IGdlbmevoYmIW/3QE52Q5kQCwsjw9WLFjSQkzHX2IRRUis+OzcB7l4WwZH+2DLfDE+LCXYPBUorhtw41aaO2K71ga7BX5Zaq3YfYzvdcFk9gKUNYQtjIdFTAGcDZxNisJuFcpwGCPEHLFa0nmkE66eF3CCHNJCGOjwrWaROLx++FO9gzXLb/YIvOadTab3eCaGMR2ByFLgeFh4HA5KmQGlkIMQi2Cqb4eWEUE4Ng8cJmypixhK5/uXLI06v11yVMlBz5DilZwIxJALXz0BEE4BIjCGvEGIp4LGzYCy9kOg1oIL0cPU5wDyyW1XTUrO0YdkjwcHWPaUCQXcq6yAw2NINkvNARANuuwNilRJg7WDa+kHKpRDrFABJQqyRQ6KnAVFosZ9+XebI5/D4Nv3Ufmm3+1HdSiHnkNEqCbyMGx67BwJK6OsFGgUElABudhCkTAuBdmw7SRsOqvQt+QSRNzQCfPbPGg9s0A48fTLP6bUkj4nSGrkBXk6pSY1IKoVjgG+XBmgcQq2xxtZsvRxxlysl8v6AntVvbnIRMylH8y8AAAAASUVORK5CYII=)`,
          backgroundSize: '100% 100%',
        }
      },
      '&-notice': {
        display: 'flex',
        flex: '1',
        zIndex: 99,
        alignItems: 'flex-end',
        [`@media (max-width: ${token.screenMDMin}px)`]: {
          display: 'flex',
          flex: 'none',
        },
      },
      '&-loginbox': {
        display: 'flex',
        flex: '1',
        zIndex: 99,
        flexDirection: 'column',
        paddingInline: 0,
        paddingBlock: 32,
        alignItems: 'center',
        justifyContent: 'center',
        height: 'max-content',
        margin: 'auto',
        overflow: 'hidden',
      },
    },
  };
};
interface LoginFormPageToken extends BizAliasToken { }
export function useStyle(prefixCls?: string) {
  return useAntdStyle('LoginFormPage', (token) => {
    const bizToken: LoginFormPageToken = {
      ...token,
    };
    return [genBizStyle(bizToken)];
  }, prefixCls);
}
